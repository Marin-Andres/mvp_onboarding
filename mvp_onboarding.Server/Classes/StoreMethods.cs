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
            var query = _context.Stores.AsQueryable();

            try
            {
                if (sortDirection.ToLower() == "asc")
                {
                    query = query.OrderBy(c => EF.Property<Store>(c, sortColumn));
                }
                else
                {
                    query = query.OrderByDescending(c => EF.Property<Store>(c, sortColumn));
                }
            }
            catch (InvalidOperationException ex)
            {
                Console.WriteLine(ex.Message);
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

        public async Task<StoreDto> GetStore(int id)
        {
            var store = await _context.Stores.FindAsync(id);
            if (store == null)
            {
                return null;
            }
            return StoreMapper.EntityToDto(store);
        }
        public async Task<StoreDto> AddStore(StoreDto storeDto)
        {
            var store = StoreMapper.DtoToEntity(storeDto);

            _context.Add(store);
            await _context.SaveChangesAsync();

            return StoreMapper.EntityToDto(store);
        }
        public async Task<StoreDto> UpdateStore(int id, StoreUpdateDto storeDto)
        {

            var store = StoreMapper.DtoToEntity(storeDto);

            _context.Entry(store).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StoreExists(id))
                {
                    return null;
                }
                else
                {
                    throw;
                }
            }

            return StoreMapper.EntityToDto(store);

        }
        public async Task<StoreDto> DeleteStore(int id)
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
        public bool StoreExists(int id)
        {
            return _context.Stores.Any(e => e.Id == id);
        }
    }
}
