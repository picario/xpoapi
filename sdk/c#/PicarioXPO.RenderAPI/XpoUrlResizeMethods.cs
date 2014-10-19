using System.Diagnostics.CodeAnalysis;

namespace PicarioXPO.RenderAPI
{
    /// <summary>
    /// Defines the different resize methods for PicarIS
    /// </summary>
    [SuppressMessage("Microsoft.Design", "CA1008:EnumsShouldHaveZeroValue", Justification="Enum values have to match current URL api values which start with 1.")]
    public enum XpoUrlResizeMethods
    {
        /// <summary>
        /// Resizes the output image using its aspect ratio
        /// </summary>
        KeepAspect = 1,

        /// <summary>
        /// Stretches the output image to the specified width and height
        /// </summary>
        Stretch = 2,

        /// <summary>
        /// Crops the output image to the specified width and height
        /// </summary>
        Crop = 3,

        /// <summary>
        /// Repeats the output image
        /// </summary>
        Repeat = 4,

        /// <summary>
        /// Resizes the output image to the maximum of the aspect ratio
        /// </summary>
        KeepAspectMax = 5,

        /// <summary>
        /// Never upscales the image however the canvas is expended to fill the desired area
        /// </summary>
        Canvas = 6
    }
}