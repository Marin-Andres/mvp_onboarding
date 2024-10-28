using mvp_onboarding.Server.Dtos;
using mvp_onboarding.Server.Models;

namespace mvp_onboarding.Server.Mappers
{
    public class StoreMapper
    {
        public static Store DtoToEntity(StoreDto storeDto)
        {
            var entity = new Store
            {
                Id = storeDto.Id,
                Name = storeDto.Name,
                Address = storeDto.Address
            };

            return entity;
        }
        public static Store DtoToEntity(StoreUpdateDto storeDto)
        {
            var entity = new Store
            {
                Id = storeDto.Id,
                Name = storeDto.Name,
                Address = storeDto.Address
            };

            return entity;
        }

        public static StoreDto EntityToDto(Store store)
        {
            var storeDto = new StoreDto
            {
                Id = store.Id,
                Name = store.Name,
                Address = store.Address
            };

            return storeDto;
        }
    }
}
