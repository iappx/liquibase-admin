using Alpi.Server.Dto.Attributes;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Alpi.Server.Dto
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            Assembly[] assemblies = AppDomain.CurrentDomain.GetAssemblies();
            List<Type> typeList = new List<Type>();

            for (int i = 0; i < assemblies.Length; i++)
            {
                typeList.AddRange(assemblies[i].GetTypes().Where(p => p.GetCustomAttributes<DtoChildAttribute>().Any()));
            }
            Type[] types = typeList.ToArray();

            Dictionary<Type, List<Type>> dtos = new Dictionary<Type, List<Type>>();

            for (int i = 0; i < types.Length; i++)
            {
                Type[] parents = types[i].GetCustomAttributes<DtoChildAttribute>().Select(p => p.DtoParent).ToArray();
                for (int j = 0; j < parents.Length; j++)
                {
                    if (dtos.ContainsKey(parents[j]))
                    {
                        dtos[parents[j]].Add(types[i]);
                    }
                    else
                    {
                        dtos[parents[j]] = new List<Type>()
                        {
                            types[i]
                        };
                    }
                }
            }

            MethodInfo method = typeof(MappingProfile).GetMethods().First(p => p.Name == nameof(CreateMap) && p.GetParameters().Count() == 0);
            MethodInfo generic;
            Type[] dtoParents = dtos.Keys.ToArray();
            for (int i = 0; i < dtoParents.Length; i++)
            {
                for (int j = 0; j < dtos[dtoParents[i]].Count; j++)
                {
                    generic = method.MakeGenericMethod(dtoParents[i], dtos[dtoParents[i]][j]);
                    generic.Invoke(this, null);
                }
            }
        }
    }
}
