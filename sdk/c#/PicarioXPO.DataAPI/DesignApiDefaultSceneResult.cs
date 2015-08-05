using Newtonsoft.Json;

namespace PicarioXPO.DataAPI
{
    public class DesignApiDefaultSceneResult
    {
        [JsonProperty("url")]
        public string Url { get; set; }

        [JsonProperty("sceneId")]
        public int SceneId { get; set; }
    }
}