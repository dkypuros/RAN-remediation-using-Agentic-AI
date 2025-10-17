import { Badge } from "@/components/ui/badge";

export function AIPacketQuestionsBadge({ type }: { type: 'ticket-search' | 'ticket-creation' | 'ticket-analysis' }) {
  let color, text;
  switch (type) {
    case 'ticket-search':
      color = 'bg-blue-500 text-white';
      text = 'Ticket Search';
      break;
    case 'ticket-creation':
      color = 'bg-green-500 text-white';
      text = 'Create Ticket';
      break;
    case 'ticket-analysis':
      color = 'bg-red-500 text-white';
      text = 'Ticket Analysis';
      break;
  }

  return (
    <Badge className={`${color} px-2 py-1 rounded-full text-xs font-medium`}>
      {text}
    </Badge>
  );
}
