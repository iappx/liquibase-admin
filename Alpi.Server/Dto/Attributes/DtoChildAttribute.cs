namespace Alpi.Server.Dto.Attributes
{
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = true)]
    public class DtoChildAttribute : Attribute
    {
        public Type DtoParent { get; set; }

        public DtoChildAttribute(Type dtoParent)
        {
            DtoParent = dtoParent;
        }
    }
}
