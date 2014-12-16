namespace XpoRenderApiNetDemo.ViewModels
{
    public class Database
    {
        public Scene Scene { get; set; }
        public Scene OverlayScene { get; set; }
        public Design Design { get; set; }
        public Design FloorDesign { get; set; }
        public Design ContrastDesign { get; set; }

        public Database()
        {
            Scene = new Scene
            {
                DisplayWidth = 1535,
                DisplayHeight = 1535,
                ReferenceId = "laura_room.pfs",
            };

            OverlayScene = new Scene
            {
                DisplayWidth = 800,
                DisplayHeight = 450,
                ReferenceId = "OverlayScene.pfs",
            };

            Design = new Design
            {
                DisplayName = "Logo-Picario_1336",
                DisplayWidth = 876,
                DisplayHeight = 318,
                ReferenceId = "3826_LogoPicario_1336.png",
                DesignOptions = new DesignOptions
                {
                    Repeat = true,
                    Width = 60.0,
                    Height = 22.0,
                    Gloss = 0.0,
                    Contrast = 0.7,
                    DropX = 0.3,
                    DropY = 0.5,
                    PlacingPointX = 0.3,
                    PlacingPointY = 0.5,
                    Flip = true,
                    Rotation = 180
                }
            };

            FloorDesign = new Design
            {
                DisplayName = "4298",
                DisplayWidth = 1200,
                DisplayHeight = 800,
                ReferenceId = "3804_4289.jpg",
                DesignOptions = new DesignOptions
                {
                    Repeat = true,
                    Width = 424.0,
                    Height = 283.0,
                    Gloss = 0.0,
                    Contrast = 0.7,
                    DropX = 0.3,
                    DropY = 0.5,
                    PlacingPointX = 0.3,
                    PlacingPointY = 0.5,
                    Flip = true,
                    Rotation = 180
                }
            };

            ContrastDesign = new Design
            {
                DisplayName = "Football",
                DisplayWidth = 4285,
                DisplayHeight = 2710,
                ReferenceId = "3806_Football.png",
                DesignOptions = new DesignOptions
                {
                    Repeat = false,
                    Width = 1134.0,
                    Height = 718.0,
                    Gloss = 0.0,
                    Contrast = 0.9,
                    DropX = 0.5,
                    DropY = 0.5,
                    PlacingPointX = 0.5,
                    PlacingPointY = 0.3,
                    Flip = false,
                    Rotation = 0
                }
            };
        }
    }
}