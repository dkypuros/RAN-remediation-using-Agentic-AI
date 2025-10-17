# 5G SecOps

This repository contains the 5G Security Operations project.

## Development Setup

### Node.js Environment Setup with fnm

This project uses [fnm (Fast Node Manager)](https://github.com/Schniz/fnm) to manage Node.js versions. Follow these steps to set up your environment:

1. **Install fnm** if you haven't already:
   - Windows (with PowerShell): `winget install Schniz.fnm`
   - macOS (with Homebrew): `brew install fnm`
   - Other installation methods: [fnm GitHub](https://github.com/Schniz/fnm#installation)

2. **Configure your shell**:
   
   For PowerShell (Windows):
   ```powershell
   # Create PowerShell profile if it doesn't exist
   New-Item -Path (Split-Path $PROFILE) -ItemType Directory -Force
   New-Item -Path $PROFILE -ItemType File -Force

   # Add fnm configuration to profile
   Add-Content -Path $PROFILE -Value '# Set up fnm (Fast Node Manager)'
   Add-Content -Path $PROFILE -Value 'fnm env --use-on-cd | Out-String | Invoke-Expression'
   
   # Source the profile
   . $PROFILE
   ```

   For Bash/Zsh (macOS/Linux):
   ```bash
   # Add to .bashrc or .zshrc
   echo 'eval "$(fnm env --use-on-cd)"' >> ~/.bashrc  # or ~/.zshrc
   source ~/.bashrc  # or ~/.zshrc
   ```

3. **Install and use Node.js**:
   ```
   fnm install --lts
   fnm use default  # or specify a version
   ```

4. **Verify installation**:
   ```
   node -v
   npm -v
   ```

### Troubleshooting Node.js Environment

If you encounter issues with Node.js commands not being recognized:

1. **Check if fnm is properly configured**:
   ```
   fnm --version
   ```

2. **If fnm works but Node.js commands don't**:
   - Ensure your shell profile is properly configured (see step 2 above)
   - Try restarting your terminal/shell
   - Run `fnm use default` to activate the default Node.js version

3. **Quick fix for Windows**:
   - Use the included `start-dev.bat` script which handles fnm configuration automatically

## Running the Application

1. **Install dependencies**:
   ```
   npm install
   ```

2. **Start the development server**:
   ```
   npm run dev
   ```
   
   Or on Windows, you can use:
   ```
   .\start-dev.bat
   ```

3. **Access the application**:
   - Local: http://localhost:3050
   - Network: http://0.0.0.0:3050

## Additional Information

For more details about the project structure and features, please refer to the documentation in the `docs` directory.
