# versionBumper

`versionBumper` is a simple CLI tool designed to help you manage and track versions in your project. It automates the process of updating version numbers in your `package.json` and optionally in your `.env` file, and it also commits and pushes these changes to your Git repository.

## Features

- Increment version numbers in `package.json` (major, minor, patch).
- Optionally update version numbers in a specified `.env` file.
- Automatically commit and push changes to your Git repository with a custom commit message.
- Configurable through a `versionBump.conf.json` file.

## Installation

To install `versionBumper`, you need to have Node.js and npm installed. Then, you can install it globally using npm:

```sh
npm install -g @aglstudio/versionbumper
or
npm install @aglstudio/versionbumper --save-dev
```

## Configuration

You can configure versionBumper using a versionBump.conf.json file in the root of your project. Here is an example configuration:

```json
{
  "files": [
    {
      "path": "package.json",
      "type": "json",
      "field": "version"
    },
    {
      "path": ".env",
      "type": "env",
      "key": "NEXT_PUBLIC_VERSION"
    }
  ],
  "changeEnv": true,
  "skipGitCheck": false
}
```

changeEnv: (boolean) Whether to update the version in the .env file.
envVersionValue: (string) The key in the .env file that holds the version number.
envVersionFile: (string) The path to the .env file.

## Usage

To use versionBumper, navigate to your project directory and run:

```sh
versionBumper [options]
```

Options:
- `--config`, `-c`: Specify a custom path to the configuration file (default: versionBump.conf.json)

Examples:
```sh
versionBumper
versionBumper --config ./config/my-version-bump.json
versionBumper -c ../shared-config.json
```

You will be prompted to select the type of version change (major, minor, patch) and to enter a commit message. If changeEnv is not specified in the configuration file, you will also be asked if you want to update the .env file.

Example

- Run the command:

```sh
versionBumper
```

- Select the type of version change:

```sh
? What type of change? (Use arrow keys)
❯ major
  minor
  patch
```

Enter the commit message:

```sh
? Enter the commit message: Updated version to 1.0.0
```

If changeEnv is not specified in the configuration file, you will be asked:

```sh
? Do you want to update the .env file? (Y/n)
```

## How It Works

Configuration Check: The tool reads the configuration from versionBump.conf.json using the checkForConf function.
Version Update: It updates the version in package.json using the updatePackageVersion function.
Environment File Update: If configured, it updates the version in the .env file using the updateEnv function.
Git Operations: It commits and pushes the changes to the Git repository using the pushToGit function.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on GitHub.

## License

This project is licensed under the ISC License. See the LICENSE file for details.

## Contact

For any questions or issues, please open an issue on GitHub.

## Acknowledgements

- inquirer
- simple-git
