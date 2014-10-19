using System;

namespace PicarioXPO.RenderAPI.Fluent
{
    public class FluentXpoUrlFactory : IFluentXpoUrlFactory
    {
        public IFluentXpoUrlGenerator CreateFluentUrlGenerator(IXpoUrlGenerator generator, FluentXpoUrlType urlType)
        {
            return new FluentXpoUrlGenerator(generator, GetUrlRequest(urlType));
        }

        private static XpoUrlRequest GetUrlRequest(FluentXpoUrlType urltype)
        {
            switch (urltype)
            {
                case FluentXpoUrlType.Image:
                    return new XpoImageUrlRequest();
                case FluentXpoUrlType.Coordinates:
                    return new XpoCoordinatesUrlRequest();
                default:
                    throw new InvalidOperationException("Cannot determine correct URL type");
            }
        }
    }
}