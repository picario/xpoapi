namespace PicarioXPO.RenderAPI.Fluent
{
    /// <summary>
    /// Represents the Fluent XPO URL generator
    /// </summary>
    public interface IFluentXpoUrlFactory
    {
        /// <summary>
        /// Creates a new instance of the currently implemented <c>IXpoUrlGenerator</c> and wraps it
        /// inside the <c>IFluentXpoUrlGenerator</c>
        /// </summary>
        IFluentXpoUrlGenerator CreateFluentUrlGenerator(IXpoUrlGenerator generator, FluentXpoUrlType urlType);
    }
}
