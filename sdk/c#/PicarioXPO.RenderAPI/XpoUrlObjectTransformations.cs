using System;

namespace PicarioXPO.RenderAPI
{
    /// <summary>
    /// Defines the different resize methods for PicarIS version 1
    /// </summary>
    [Obsolete("No longer used in version 2. Use the Rotation and Flip parameters.")]
    public enum XpoUrlObjectTransformations
    {
        /// <summary>
        /// Default
        /// </summary>
        None = 1,

        /// <summary>
        /// Text Only
        /// </summary>
        Arc = 2,

        /// <summary>
        /// Images and Text
        /// </summary>
        Rotate = 3,

        /// <summary>
        /// Images and Text
        /// </summary>
        FlipX = 4,

        /// <summary>
        /// Images and Text
        /// </summary>
        FlipY = 5
    }
}