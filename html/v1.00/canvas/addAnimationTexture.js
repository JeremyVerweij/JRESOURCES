JRESOURCES.animations = [];

for (let i = 0; i < 16; i++) {
    JRESOURCES.animations.push(0);
}

JRESOURCES.canvas.animation = class{
    constructor(resourceCanvas, name, src, steps){
        if(steps < 1){
            LOG.error("JRESOURCES: can't have an animation with 0 frames");
            return;
        }

        if(steps > 16){
            LOG.error("JRESOURCES: can't have an animation with more than 16 frames");
            return;
        }

        this.resourceCanvas = resourceCanvas;
        this.name = name;
        this.src = src;
        this.steps = steps;

        this.resourceCanvas.addAnimatedTexture(this.src, this.name, this.steps);
    }

    get(){
       return this.resourceCanvas.get(this.name, JRESOURCES.animations[this.steps - 1]);
    }
}

JRESOURCES.iterateanimations = function(){
    for (let i = 0; i < 16; i++) {
        JRESOURCES.animations[i]++;
        if(JRESOURCES.animations[i] > i + 1) JRESOURCES.animations[i] = 0;
    }
}

window.dispatchEvent(JLIB.common.scriptLoaded)
