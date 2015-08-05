using Newtonsoft.Json;

namespace PicarioXPO.DataAPI
{
    public class DesignOptionsApiResult
    {
        [JsonProperty("repeat")]
        public bool Repeat { get; set; }

        [JsonProperty("width")]
        public double Width { get; set; }

        [JsonProperty("height")]
        public double Height { get; set; }

        [JsonProperty("gloss")]
        public double Gloss { get; set; }

        [JsonProperty("contrast")]
        public double Contrast { get; set; }

        [JsonProperty("dropX")]
        public double DropX { get; set; }

        [JsonProperty("dropY")]
        public double DropY { get; set; }

        [JsonProperty("placingPointX")]
        public double PlacingPointX { get; set; }

        [JsonProperty("placingPointY")]
        public double PlacintPointY { get; set; }

        [JsonProperty("flip")]
        public bool Flip { get; set; }

        [JsonProperty("rotation")]
        public int Rotation { get; set; }
    }
}