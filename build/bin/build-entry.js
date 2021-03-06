/* eslint-disable no-console */

var fs = require('fs');
var render = require('json-templater/string');
var uppercamelcase = require('uppercamelcase');
var path = require('path');
var endOfLine = require('os').EOL;
var Components = require('../../components.json');

var OUTPUT_PATH = path.join(__dirname, '../../src/index.js');
var INSTALL_COMPONENT_TEMPLATE = '    {{name}}';
var IMPORT_TEMPLATE = 'export { default as {{name}} }  from \'./components/{{package}}\';';
var MAIN_TEMPLATE = `/* Automatic generated by './build/bin/build-entry.js' */
{{include}}
`;

var ComponentNames = Object.keys(Components.base);

var includeComponentTemplate = [];
var installTemplate = [];
var listTemplate = [];

ComponentNames.forEach((name) => {
    var componentName = uppercamelcase(name);

    includeComponentTemplate.push(render(IMPORT_TEMPLATE, {
        name: componentName,
        package: name
    }));
});

var template = render(MAIN_TEMPLATE, {
    include: includeComponentTemplate.join(endOfLine)
});

fs.writeFileSync(OUTPUT_PATH, template);

console.log('[build entry] DONE:', OUTPUT_PATH);
