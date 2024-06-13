export const NativeModulesProxy = {}
export const Platform = {}
export const PermissionStatus = {}
export const createPermissionHook = jest.fn()
export const UnavailabilityError = jest.fn()
export const requireNativeModule = jest.fn().mockImplementation((moduleName) => {
    return {}
})
