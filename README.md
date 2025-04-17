# LinQR - Show QR Codes for hovered links
This Firefox Addon adds a simple toggle that allows you to render any link you hover over as a QR code.

It was originally created to make downloading files directly to a modded Nintendo 3DS with Multidownload a lot easier.

## Performance
On a modern system, the extension can generate and display a QR Code nigh instantaneously, though moving the mouse may feel less smooth due to having to use JavaScript to position it. Care was taken to ensure QR codes aren't generated more often than necessary, however, I *deliberately do not cache* the generated codes to keep things simple and performant for newly-hovered links.

## Future Considerations
Eventually, I might want to create a ManifestV3 version of this extension that works in chromium browsers as well, but since I only need Firefox support, this is fine.

## Dependencies
- The Icons are from Tabler via iconfy.design.
- The vendored library QRious is used to generate and display the actual QR Codes.