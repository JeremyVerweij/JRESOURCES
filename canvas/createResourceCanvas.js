JRESOURCES.canvas.resourceCanvas = class extends JRENDER.canvas.canvas {
    constructor(name, maxX = 1, resourceSize = 16){
        super("JRESOURCES/" + name, false, false, false, true, false, 1, 1, 0.008, maxX * resourceSize, resourceSize, "#000000", false, 0, 0, 0, 0);
        this.resources = {};
        this.indexX = 0;
        this.indexY = 0;
        this.maxX = maxX * resourceSize;
        this.resourceSize = resourceSize;

        this.addTexture("lib/" + JLIB_EXTENSIONS.JRESOURCES.src + "/canvas/error.png", "ERROR")
    }

    resize(){
        var tmpCanvas = document.createElement("canvas");
        if(this.pixelArt) tmpCanvas.style.imageRendering = "pixelated";
        tmpCanvas.width = this.canvas_width;
        tmpCanvas.height = this.canvas_height;
        
        var ctx = tmpCanvas.getContext('2d');
        ctx.drawImage(this.html, 0, 0);
        
        this.canvas_height = this.indexY + this.resourceSize;
        this.html.height = this.canvas_height;
        this.drawIMGcomplex(tmpCanvas, 0, 0, this.canvas_width, tmpCanvas.height, 0, 0, this.canvas_width, tmpCanvas.height);
    }

    addTexture(src, name){
        var IMG = new Image
        IMG.src = src;
        IMG.onload = () => {
            this.drawIMGcomplex(IMG, this.indexX, this.indexY, this.resourceSize, this.resourceSize, 0, 0, this.resourceSize, this.resourceSize);
            this.resources[name] = {
                name: name,
                type: "textureDefault",
                x: this.indexX,
                y: this.indexY,
                size: this.resourceSize
            }
            this.indexX += this.resourceSize;
            if(this.indexX >= this.maxX){
                this.indexX = 0;
                this.indexY += this.resourceSize;
                this.resize();
            }
        }
    }

    addAnimatedTexture(src, name, steps){
        var IMG = new Image
        IMG.src = src;
        IMG.onload = () => {
            this.resources[name] = {
                name: name,
                type: "textureAnimated",
                x: this.indexX,
                y: this.indexY,
                size: this.resourceSize,
                animations: []
            }

            for (let i = 0; i < steps; i++) {
                this.drawIMGcomplex(IMG, this.indexX, this.indexY, this.resourceSize, this.resourceSize, this.resourceSize * i, 0, this.resourceSize, this.resourceSize);
                this.resources[name].animations.push({
                    name: name + "_animation#" + i,
                    type: "animationDefault",
                    x: this.indexX,
                    y: this.indexY,
                    size: this.resourceSize
    
                })
                this.indexX += this.resourceSize;
                if(this.indexX >= this.maxX){
                    this.indexX = 0;
                    this.indexY += this.resourceSize;
                    this.resize();
                }
            }
        }
    }

    get(name, animationFrame = 0){
        var r = this.resources[name];
        if(r == undefined) return {name: "ERROR", x: 0, y: 0, size: this.resourceSize};
        if(r.type == "textureDefault") return r;
        if(r.type == "textureAnimated") {
            if(animationFrame >= r.animations.length) return {name: "ERROR", x: 0, y: 0, size: this.resourceSize};
            return r.animations[animationFrame];
        }
    }

    src(){
        return this.html;
    }
}

window.dispatchEvent(JLIB.common.scriptLoaded)
