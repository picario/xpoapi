namespace XpoRenderApiNetDemo.ViewModels
{
    /// <summary>
    /// Defines the different types of designs
    /// </summary>
    public enum DesignTypes
    {
        /// <summary>
        /// The design is a PFT file used by the FACE engine.
        /// Additional properties for this type will be loaded automatically and cannot be changed.
        /// </summary>
        Pft = 0,

        /// <summary>
        /// The design is a user uploaded image (JPG, PNG, BMP etc) that can be used on the visualizer.
        /// Additional properties can be set manually, and can be changed.
        /// </summary>
        Image = 1
    }
}