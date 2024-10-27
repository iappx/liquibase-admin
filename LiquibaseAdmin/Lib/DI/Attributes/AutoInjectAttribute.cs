using LiquibaseAdmin.Lib.DI.Enum;

namespace LiquibaseAdmin.Lib.Di.Attributes
{
    [AttributeUsage(AttributeTargets.Class)]
    public class AutoInjectAttribute : Attribute
    {
        public InjectionScope InjectionScope { get; set; }

        public AutoInjectAttribute()
        {
            InjectionScope = InjectionScope.Scoped;
        }

        public AutoInjectAttribute(InjectionScope injectionScope)
        {
            InjectionScope = injectionScope;
        }
    }
}
