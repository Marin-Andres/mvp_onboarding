using mvp_onboarding.Server.Dtos;
using mvp_onboarding.Server.Interfaces;
using mvp_onboarding.Server.Models;
using Microsoft.EntityFrameworkCore;
using mvp_onboarding.Server.Mappers;

namespace mvp_onboarding.Server.Classes
{
    public class StoreMethods : IStoreMethods
    {
        public StoreMethods(TalentOnboardingContext context)
        {
            _context = context;
        }

        private readonly TalentOnboardingContext _context;

        public async Task<StoreResponseDto> GetStores(int pageNumber, int pageSize, string sortColumn, string sortDirection)
        {
            try
            {
                var query = _context.Stores.AsQueryable();

                if (sortDirection.ToLower() == "asc")
                {
                    query = query.OrderBy(c => EF.Property<Store>(c, sortColumn));
                }
                else
                {
                    query = query.OrderByDescending(c => EF.Property<Store>(c, sortColumn));
                }

                var totalCount = await query.CountAsync();
                var stores = await query
                    .Skip((pageNumber - 1) * pageSize)
                    .Take(pageSize)
                    .ToListAsync();

                var storeDtos = stores.Select(c => StoreMapper.EntityToDto(c)).ToList();

                return new StoreResponseDto
                {
                    Items = storeDtos,
                    TotalCount = totalCount,
                    PageSize = pageSize,
                    CurrentPage = pageNumber
                };
            }
            catch (InvalidOperationException ex)
            {
                Console.WriteLine(ex.Message);

                return new StoreResponseDto
                {
                    Items = new List<StoreDto>(),
                    TotalCount = 0,
                    PageSize = pageSize,
                    CurrentPage = pageNumber
                };
            }

        }

        public async Task<StoreDto> GetStore(int? id)
        {
            try
            {
                if (id == null)
                {
                    return null;
                }
                else
                {
                    var store = await _context.Stores.FindAsync(id);
                    if (store == null)
                    {
                        return null;
                    }
                    return StoreMapper.EntityToDto(store);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());

                return null;
            }

        }
        public async Task<StoreDto> AddStore(StoreDto storeDto)
        {
            try
            {
                var store = StoreMapper.DtoToEntity(storeDto);

                _context.Add(store);
                await _context.SaveChangesAsync();

                return StoreMapper.EntityToDto(store);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"{ex.Message}");
                return null;
            }
        }
        public async Task<StoreDto> UpdateStore(int? id, StoreUpdateDto storeDto)
        {
            try
            {
                if (!StoreExists(id))
                {
                    return null;
                }
                else
                {
                    var store = StoreMapper.DtoToEntity(storeDto);

                    _context.Entry(store).State = EntityState.Modified;
                    await _context.SaveChangesAsync();
                    return StoreMapper.EntityToDto(store);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine (ex.ToString());
                return null;
            }
        }
        public async Task<StoreDto> DeleteStore(int? id)
        {
            try
            {
                if (id == null)
                {
                    return null;
                }
                else
                {
                    var store = await _context.Stores.FindAsync(id);
                    if (store == null)
                    {
                        return null;
                    }

                    _context.Stores.Remove(store);
                    await _context.SaveChangesAsync();

                    return StoreMapper.EntityToDto(store);
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
        }
        public bool StoreExists(int? id)
        {
            if (id == null)
            {
                return false;
            }
            else
            {
                return _context.Stores.Any(e => e.Id == id);
            }
        }
    }
}
