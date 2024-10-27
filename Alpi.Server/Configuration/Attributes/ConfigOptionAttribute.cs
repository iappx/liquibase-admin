using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Alpi.Server.Configuration.Attributes
{
    public class ConfigOptionAttribute : Attribute
    {
        public string SectionName { get; set; } = "";
        public ConfigOptionAttribute() { }

        public ConfigOptionAttribute(string sectionName)
        {
            SectionName = sectionName;
        }
    }
}
