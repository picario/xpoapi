using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace PicarioXPO.DataAPI
{
    public class EntityApiResult
    {
        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("properties")]
        public IEnumerable<EntityApiPropertyInfo> Properties { get; set; }

        [JsonProperty("propertiesPerLabel")]
        public List<EntityApiPropertyPerLabelInfo> PropertiesPerLabel { get; set; }
            
        [JsonProperty("labels")]
        public IEnumerable<LabelApiResult> Labels { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("createDate")]
        public DateTime CreateDate { get; set; }

        [JsonProperty("lastSaveDate")]
        public DateTime LastSaveDate { get; set; }

        [JsonProperty("attachments")]
        public IEnumerable<AttachmentApiResult> Attachments { get; set; } 

        [JsonProperty("storageName")]
        public string StorageName { get; set; }

        [JsonProperty("storagePath")]
        public string StoragePath { get; set; }

        [JsonProperty("relations")]
        public RelationsApiResult Relations { get; set; }

        [JsonProperty("referenceId")]
        public string ReferenceId { get; set; }
    }
}