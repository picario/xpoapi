/*
 * For demo purposes we use hardcoded data, in a production application you should use data you get from an API or other datasource.
 */

function Database() {
    this.scene = {
        displayWidth: 1535,
        displayHeight: 1535,
        referenceId: "laura_room.pfs"
    }

	this.overlayScene = {
		displayWidth: 800,
		displayHeight: 450,
		referenceId: "OverlayScene.pfs"
	}
	
    this.design = {
        displayWidth: 876,
        displayHeight: 318,
        referenceId: "3826_LogoPicario_1336.png",
        designOptions: {
            repeat: true,
            width: 60.0,
            height: 22.0,
            gloss: 0.0,
            contrast: 0.7,
            dropX: 0.3,
            dropY: 0.5,
            placingPointX: 0.3,
            placingPointY: 0.5,
            flip: true,
            rotation: 180
        }
    }

    this.floorDesign = {
        displayWidth: 1200,
        displayHeight: 800,
        referenceId: "3804_4289.jpg",
        designOptions: {
            repeat: true,
            width: 424.0,
            height: 283.0,
            gloss: 0.0,
            contrast: 0.7,
            dropX: 0.3,
            dropY: 0.5,
            placingPointX: 0.3,
            placingPointY: 0.5,
            flip: true,
            rotation: 180
        }
    }

	this.contrastDesign = {
		displayWidth: 4285,
		displayHeight: 2710,
		referenceId: "3806_Football.png",
		designOptions: {
			repeat: false,
			width: 1134.0,
			height: 718.0,
			gloss: 0.0,
			contrast: 0.9,
			dropX: 0.5,
			dropY: 0.5,
			placingPointX: 0.0,
			placingPointY: 0.0,
			flip: false,
			rotation: 0
		}
	};
}