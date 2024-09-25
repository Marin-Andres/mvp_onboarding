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

        public async Task<IEnumerable<StoreDto>> GetStores()
        {
            var _stores = await _context.Stores.Select(c => StoreMapper.EntityToDto(c)).ToListAsync();

            return (_stores);
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
