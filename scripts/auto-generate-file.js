import chokidar from 'chokidar';
import { sep, basename, join } from 'path';
import fs from 'fs';
import upperFirst from 'lodash/upperFirst';

const RESOURCE_FOLDER = {
    PAGES: 'pages',
    COMPONENTS: 'components',
    LAYOUTS: 'layouts',
    MICROSERVICES: 'microservices',
    SERVICES: 'services',
};

const RESOURCE_TYPE = {
    PAGE: 'page',
    COMPONENT: 'component',
    LAYOUT: 'layout',
    MICROSERVICE: 'microservice',
    SERVICE: 'service',
};

const directoryWatcher = chokidar.watch(
    [
        './src/components/**/*',
        './src/pages/**/*',
        './src/services/**/*',
        './src/microservices/**/*',
        './src/layouts/**/*',
    ],
    {
        persistent: true,
        ignoreInitial: true,
    },
);

directoryWatcher.on('addDir', directoryAdded);

function directoryAdded(directoryPath) {
    const isDirectoryEmpty = fs.readdirSync(directoryPath).length === 0;

    if (!isDirectoryEmpty) {
        return;
    }

    if (isComponent(directoryPath) || isPage(directoryPath) || isLayout(directoryPath)) {
        const resourceName = getResourceName(directoryPath);
        const filePath = join(directoryPath, `${resourceName}.tsx`);

        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, getReactTemplate(resourceName, filePath));
        }
    }
}

function isComponent(resourcePath) {
    return (
        resourcePath.startsWith(join('src', RESOURCE_FOLDER.COMPONENTS)) &&
        !isStylesheet(resourcePath)
    );
}

function isPage(resourcePath) {
    return (
        resourcePath.startsWith(join('src', RESOURCE_FOLDER.PAGES)) && !isStylesheet(resourcePath)
    );
}

function isStylesheet(resourcePath) {
    const resourceFilename = basename(resourcePath, '.js');
    return resourceFilename.startsWith('styles.ts');
}

function isLayout(resourcePath) {
    return (
        resourcePath.startsWith(join('src', RESOURCE_FOLDER.LAYOUTS)) && !isStylesheet(resourcePath)
    );
}

function getResourceName(resourcePath) {
    const resourceFolder = getResourceRootFolder(resourcePath);
    const resourceType = getResourceTypeByResourceFolder(resourceFolder);

    const parts = resourcePath.replace(/-/g, `${sep}`).split(sep);

    parts.shift();
    parts.shift();

    const isDirectory = fs.lstatSync(resourcePath).isDirectory();

    if (!isDirectory) {
        if ([RESOURCE_TYPE.MICROSERVICE, RESOURCE_TYPE.SERVICE].includes(resourceType)) {
            const resourceFileNameWithoutExtension = basename(parts.pop(), '.tsx');
            parts.push(resourceFileNameWithoutExtension);
        } else {
            parts.pop();
        }
    }

    const resourceTypesWhichShouldHaveTypeSuffix = [
        RESOURCE_TYPE.PAGE,
        RESOURCE_TYPE.LAYOUT,
        RESOURCE_TYPE.MICROSERVICE,
        RESOURCE_TYPE.SERVICE,
    ];

    if (resourceTypesWhichShouldHaveTypeSuffix.includes(resourceType)) {
        parts.push(resourceType);
    }

    return parts.map(upperFirst).join('');
}

function getResourceRootFolder(resourcePath) {
    const parts = resourcePath.replace(/-/g, `${sep}`).split(sep);
    return parts[1]; // components, layouts, microservices, pages, services
}

function getResourceTypeByResourceFolder(resourceFolder) {
    switch (resourceFolder) {
        case RESOURCE_FOLDER.PAGES:
            return RESOURCE_TYPE.PAGE;
        case RESOURCE_FOLDER.COMPONENTS:
            return RESOURCE_TYPE.COMPONENT;
        case RESOURCE_FOLDER.LAYOUTS:
            return RESOURCE_TYPE.LAYOUT;
        case RESOURCE_FOLDER.MICROSERVICES:
            return RESOURCE_TYPE.MICROSERVICE;
        case RESOURCE_FOLDER.SERVICES:
            return RESOURCE_TYPE.SERVICE;
        default:
            throw new Error(`Unknown resource folder "${resourceFolder}"!`);
    }
}

export function getReactTemplate(componentName) {
    return `import React from 'react';\n\nexport function ${componentName}() {\n    return <>${componentName} component</>;\n}\n`;
}
