using System.Collections.Generic;
using Newtonsoft.Json;

namespace PicarioXPO.DataAPI
{
    public class PropertyFilterApiResult
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("values")]
        public IEnumerable<PropertyValueApiResult> Values { get; set; }
    }
}