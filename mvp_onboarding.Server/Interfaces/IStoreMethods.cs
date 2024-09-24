using mvp_onboarding.Server.Dtos;

namespace mvp_onboarding.Server.Interfaces
{
    public interface IStoreMethods
    {
        Task<StoreDto> AddStore(StoreDto storeDto);
        Task<StoreDto> UpdateStore(int id, StoreUpdateDto storeDto);
        Task<StoreDto> DeleteStore(int id);
        Task<StoreDto> GetStore(int id);
        Task<IEnumerable<StoreDto>> GetStores();
    }
}
