namespace PicarioXPO.RenderAPI
{
    /// <summary>
    /// Factory class for getting the current <c>IXpoUrlGenerator</c> implementation
    /// </summary>
    public interface IXpoUrlFactory
    {
        /// <summary>
        /// Creates a new instance of the currently implemented <c>IXpoUrlGenerator</c> and wraps it
        /// inside the <c>FluentXpoGenerator</c>
        /// </summary>
        IXpoUrlGenerator CreateUrlGenerator();
    }
}