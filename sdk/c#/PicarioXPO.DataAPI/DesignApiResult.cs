using Newtonsoft.Json;

namespace PicarioXPO.DataAPI
{
    public class DesignApiResult : EntityApiResult
    {
        [JsonProperty("width")]
        public int Width { get; set; }

        [JsonProperty("height")]
        public int Height { get; set; }

        [JsonProperty("isNew")]
        public bool IsNew { get; set; }

        [JsonProperty("defaultScene")]
        public DesignApiDefaultSceneResult DefaultScene { get; set; }

        [JsonProperty("displayUrl")]
        public string DisplayUrl { get; set; }

        [JsonProperty("renderUrl")]
        public string RenderUrl { get; set; }

        [JsonProperty("designOptions")]
        public DesignOptionsApiResult DesignOptions { get; set; }
    }
}