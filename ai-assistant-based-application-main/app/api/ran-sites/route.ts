import { NextResponse } from 'next/server';

// RAN Services URL - internal cluster service
const RAN_SERVICES_URL = process.env.RAN_SERVICES_URL || 'http://ran-services:5000';

export async function GET() {
  try {
    // Fetch live sites from RAN services (which proxies to simulator)
    const response = await fetch(`${RAN_SERVICES_URL}/api/ran/live-sites`);

    if (!response.ok) {
      throw new Error(`RAN Services returned ${response.status}`);
    }

    const data = await response.json();

    // Fetch additional metrics for each site
    const sitesWithMetrics = await Promise.all(
      (data.sites || []).map(async (site: any) => {
        try {
          const siteResponse = await fetch(`${RAN_SERVICES_URL}/api/ran/live-sites/${site.siteId}`);
          const siteData = await siteResponse.json();

          // Calculate average SINR from cells
          const cells = siteData.cells || [];
          const avgSINR = cells.length > 0
            ? cells.reduce((sum: number, cell: any) => sum + (cell.averageSINR_dB || 0), 0) / cells.length
            : 0;

          return {
            ...site,
            totalUes: siteData.metrics?.total_connected_ues || 0,
            activeCells: siteData.metrics?.active_cells || 0,
            totalCells: siteData.metrics?.total_cells || site.cells?.length || 0,
            avgLoad: Math.round(siteData.metrics?.average_cell_load || 0),
            avgSINR: avgSINR.toFixed(1),
            cells: cells.map((cell: any) => ({
              cellId: cell.cellId,
              state: cell.cellState,
              load: cell.load,
              ues: cell.connectedUes?.length || 0,
              sinr: cell.averageSINR_dB?.toFixed(1)
            }))
          };
        } catch (error) {
          // Return site without extra metrics if fetch fails
          return {
            ...site,
            totalUes: 0,
            activeCells: site.cells?.length || 0,
            totalCells: site.cells?.length || 0
          };
        }
      })
    );

    return NextResponse.json({
      success: true,
      sites: sitesWithMetrics,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Failed to fetch live sites:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch live sites'
      },
      { status: 500 }
    );
  }
}
