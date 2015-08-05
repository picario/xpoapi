using Newtonsoft.Json;

namespace PicarioXPO.DataAPI
{
    public class ImageApiResult : EntityApiResult
    {
        [JsonProperty("width")]
        public int Width { get; set; }

        [JsonProperty("height")]
        public int Height { get; set; }

        [JsonProperty("isNew")]
        public bool IsNew { get; set; }

        [JsonProperty("displayUrl")]
        public string DisplayUrl { get; set; }

        [JsonProperty("renderUrl")]
        public string RenderUrl { get; set; }
    }
}