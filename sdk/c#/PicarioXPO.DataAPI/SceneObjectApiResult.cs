using Newtonsoft.Json;

namespace PicarioXPO.DataAPI
{
    public class SceneObjectApiResult
    {
        [JsonProperty("nr")]
        public int Nr { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("thumbUrl")]
        public string ThumbUrl { get; set; }

        [JsonProperty("supportsDesigns")]
        public bool SupportsDesigns { get; set; }

        [JsonProperty("objectWidth")]
        public double Width { get; set; }

        [JsonProperty("objectHeight")]
        public double Height { get; set; }
    }
}