var JRESOURCES = {};
JRESOURCES.canvas = {};
JLIB.extensions.JRESOURCES = JRESOURCES;

var JRESOURCES_SRC = [
    {src: "canvas/createResourceCanvas", requirements: [], enabled: () => true},
    {src: "canvas/addAnimationTexture", requirements: ["canvas/createResourceCanvas"], enabled: () => true},
];

JLIB_LOADER.LOAD_EXTENSION_SRC_LIST(JRESOURCES_SRC, "JRESOURCES");