using System.Diagnostics.CodeAnalysis;

namespace PicarioXPO.RenderAPI
{
    /// <summary>
    /// Defines the different text alignments for PicarIS
    /// </summary>
    [SuppressMessage("Microsoft.Design", "CA1008:EnumsShouldHaveZeroValue", Justification = "Enum values have to match current URL api values which start with 1.")]
    public enum XpoUrlTextAlignment
    {
        Left = 1,

        Middle = 2,

        Right = 3
    }
}
