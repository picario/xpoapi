using Newtonsoft.Json;

namespace PicarioXPO.DataAPI
{
    public class LabelApiResult
    {
        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("parentId")]
        public int ParentId { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("path")]
        public int[] Path { get; set; }
    }
}