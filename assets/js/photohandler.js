/**
 * Photo Handler Utility
 * Handles photo upload and processing for the Resume Generator
 */

const PhotoHandler = {
  /**
   * Converts an image file to a data URL
   * @param {File} file - The image file to process
   * @returns {Promise} Promise that resolves with the data URL
   */
  fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
      if (!file || !file.type.match('image.*')) {
        reject(new Error('Please select an image file'));
        return;
      }
      
      const reader = new FileReader();
      
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      
      reader.readAsDataURL(file);
    });
  },
  
  /**
   * Validates an image file
   * @param {File} file - The file to validate
   * @returns {Boolean} Whether the file is a valid image
   */
  validateImage(file) {
    // Check if file exists
    if (!file) {
      return false;
    }
    
    // Check if file is an image
    if (!file.type.match('image.*')) {
      return false;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return false;
    }
    
    return true;
  },
  
  /**
   * Crops an image to a square (for profile pictures)
   * @param {String} dataUrl - The data URL of the image
   * @returns {Promise} Promise that resolves with the cropped image data URL
   */
  cropToSquare(dataUrl) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Determine the size of the square
        const size = Math.min(img.width, img.height);
        
        // Set canvas dimensions to the square size
        canvas.width = size;
        canvas.height = size;
        
        // Calculate offsets to center the crop
        const offsetX = (img.width - size) / 2;
        const offsetY = (img.height - size) / 2;
        
        // Draw the cropped image on the canvas
        ctx.drawImage(
          img,
          offsetX, offsetY,   // Source offset
          size, size,         // Source dimensions
          0, 0,               // Destination offset
          size, size          // Destination dimensions
        );
        
        // Convert canvas to data URL
        resolve(canvas.toDataURL());
      };
      
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
      
      img.src = dataUrl;
    });
  },
  
  /**
   * Resizes an image to specified dimensions
   * @param {String} dataUrl - The data URL of the image
   * @param {Number} maxWidth - Maximum width of the resized image
   * @param {Number} maxHeight - Maximum height of the resized image
   * @returns {Promise} Promise that resolves with the resized image data URL
   */
  resizeImage(dataUrl, maxWidth, maxHeight) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        // Calculate new dimensions while maintaining aspect ratio
        let width = img.width;
        let height = img.height;
        
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
        
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        resolve(canvas.toDataURL());
      };
      
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
      
      img.src = dataUrl;
    });
  }
};