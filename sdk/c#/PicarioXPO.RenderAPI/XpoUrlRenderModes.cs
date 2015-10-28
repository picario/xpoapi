namespace PicarioXPO.RenderAPI
{
    /// <summary>
    ///  Defines the different render modes for a scene (PicarIS 2 only)
    /// </summary>
    public enum XpoUrlRenderModes
    {
        /// <summary>
        /// Normal render will output the entire scene
        /// </summary>
        Normal = 0,

        /// <summary>
        /// The FreeObjects mode will only render the objects that have been used in the URL
        /// </summary>
        FreeObjects = 1,
    }
}