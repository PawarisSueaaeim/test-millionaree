###### Setup instructions
1. Create .env.local and then add env variable "NEXT_PUBLIC_PHOTO_API=https://picsum.photos/"
2. Type a command "nvm use" in terminal at project path

###### Features implemented
### 1. Basic Features
- Infinite scroll loading (load more images when reaching bottom)
- Modal view when clicking on images
- Responsive grid layout
- Loading states and animations
- Error handling
### 2. API Integration
Using Picsum Photos API
### 3. Technical Requirements
### Responsive Layout
- Desktop: 3 columns
- Tablet: 2 columns
- Mobile: 1 column
- Consistent spacing between images
### Infinite Scroll
- Implement scroll-based loading
- Show loading indicator while fetching
- Handle scroll events efficiently
- Load 9 images per page
### Modal View
- Show larger image when clicked
- Display image details (author, dimensions)
- Close on overlay click, ESC key, or close button
- Smooth open/close animations
### Error Handling
- Show error messages when API fails
- Handle edge cases (no images, network errors)
## Bonus Features (Optional)
- Image download button

###### how to run the project
1. Type a command "npm install" in terminal at project path
2. Type a command "npm run dev" 
