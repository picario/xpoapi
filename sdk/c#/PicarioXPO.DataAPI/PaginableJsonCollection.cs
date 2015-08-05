using System.Collections.Generic;
using Newtonsoft.Json;

namespace PicarioXPO.DataAPI
{
    public sealed class PaginableJsonCollection<TValue>
    {
        [JsonProperty("totalRows")]
        public int TotalRows { get; set; }

        [JsonProperty("values")]
        public IList<TValue> Values { get; set; }

        [JsonProperty("properties", NullValueHandling = NullValueHandling.Ignore)]
        public IEnumerable<PropertyFilterApiResult> Properties { get; set; } 

        public PaginableJsonCollection(IEnumerable<TValue> values)
        {
            Values = new List<TValue>(values);
        }
    }
}