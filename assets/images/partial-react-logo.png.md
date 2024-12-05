# PNG Image Decoder Documentation

## Table of Contents

* [1. Introduction](#1-introduction)
* [2. Data Structures](#2-data-structures)
* [3. Function Details](#3-function-details)
    * [3.1 `decode_png`](#31-decode_png)
    * [3.2 `read_chunk`](#32-read_chunk)
    * [3.3 `process_chunk`](#33-process_chunk)
    * [3.4 `process_ihdr`](#34-process_ihdr)
    * [3.5 `process_plte`](#35-process_plte)
    * [3.6 `process_idat`](#36-process_idat)
    * [3.7 `process_trns`](#37-process_trns)
    * [3.8 `inflate`](#38-inflate)


<a name="1-introduction"></a>
## 1. Introduction

This document details the internal workings of a PNG image decoder.  The decoder processes raw PNG data (as a byte string) and extracts image information.  The core functionality is encapsulated within several key functions, described in detail below. The decoder handles the following PNG chunks: IHDR (image header), PLTE (palette), IDAT (image data), and tRNS (transparency).


<a name="2-data-structures"></a>
## 2. Data Structures

The decoder primarily utilizes the following data structures:

| Data Structure | Description |
|---|---|
| `png_data` (bytes) | Raw PNG data as a byte string. |
| `image_info` (dict) | Dictionary storing decoded image information (width, height, color type, etc.).  Populated by `process_ihdr`. |
| `palette` (list) | List of RGB tuples representing the image palette. Populated by `process_plte`. |
| `transparency` (dict) | Dictionary storing transparency information (alpha values for indexed or grayscale images).  Populated by `process_trns`. |
| `scanlines` (list) | List of byte strings, each representing a scanline of the decoded image. Populated by `process_idat`. |


<a name="3-function-details"></a>
## 3. Function Details

<a name="31-decode_png"></a>
### 3.1 `decode_png(png_data)`

This function serves as the main entry point for PNG decoding.

1. **Initialization:** It initializes an empty dictionary `image_info` to store image metadata and an empty list `scanlines` for the image data.


2. **Chunk Processing:** It iterates through the PNG data, extracting chunks using `read_chunk`. Each chunk is then processed by the `process_chunk` function.

3. **Data Combination:** Once all IDAT chunks are processed, the `scanlines` are combined to form the complete image data.

4. **Return:** It returns a dictionary containing image information (`image_info`) and the image data (`scanlines`).


<a name="32-read_chunk"></a>
### 3.2 `read_chunk(png_data, offset)`

This function reads a single PNG chunk from the input `png_data` starting at the given `offset`. It reads the length, type, data, and CRC fields of the chunk. It returns a tuple containing the chunk type (str) and chunk data (bytes).


<a name="33-process_chunk"></a>
### 3.3 `process_chunk(chunk_type, chunk_data, image_info, palette, transparency, scanlines)`

This function dispatches the processing of different chunk types to specific handler functions (e.g., `process_ihdr`, `process_plte`, `process_idat`, `process_trns`).  It uses a dictionary to map chunk types to their respective handlers.  Invalid chunk types are ignored.



<a name="34-process_ihdr"></a>
### 3.4 `process_ihdr(chunk_data, image_info)`

This function parses the IHDR chunk data to extract image metadata: width, height, bit depth, color type, compression method, filter method, and interlace method. It populates the `image_info` dictionary with this data.


<a name="35-process_plte"></a>
### 3.5 `process_plte(chunk_data, palette)`

This function parses the PLTE chunk data to extract the color palette.  Each entry in the palette consists of three bytes representing red, green, and blue values (RGB).  These are converted to tuples and appended to the `palette` list.


<a name="36-process_idat"></a>
### 3.6 `process_idat(chunk_data, image_info, palette, scanlines)`

This function processes the IDAT (image data) chunks.

1. **Data Decompression:** It decompresses the chunk data using the `inflate` function (zlib decompression).

2. **Scanline Processing:** The decompressed data represents multiple scanlines.  The function processes these scanlines, applying filtering (as specified in the IHDR chunk) and adding them to the `scanlines` list.


<a name="37-process_trns"></a>
### 3.7 `process_trns(chunk_data, image_info, transparency)`

This function handles the tRNS (transparency) chunk.  It parses the chunk data to obtain transparency information depending on the color type specified in the IHDR chunk (alpha values for indexed colors or grayscale). This information is stored in the `transparency` dictionary.



<a name="38-inflate"></a>
### 3.8 `inflate(data)`

This function uses the zlib library to decompress the given `data` (bytes). It utilizes the `zlib.decompress` function for efficient decompression.  Error handling for decompression failures is included.
