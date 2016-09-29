# myproj01

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.15.1.

## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.

## Carto setup

Create Named map using cURL command and config.json file
curl -X POST 'https://tenant-1.carto.com/api/v1/map/named?api_key=8754fe99c88e12fb0ac31f0b00fa2059004189fc' -H 'Content-Type: application/json' -d @config.json


Get all the thematic maps for the user
curl -X GET 'https://tenant-1.carto.com/api/v1/map/named?api_key=8754fe99c88e12fb0ac31f0b00fa2059004189fc'
