    export const createUrl = function (file) {
      try {
        return URL.createObjectURL(file)
      } catch (e) {
        throw new Error(e)
        return
      }
    }
