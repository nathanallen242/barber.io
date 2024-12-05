# Internal Code Documentation: PNG Image Decoder

## Table of Contents

* [1. Introduction](#1-introduction)
* [2. Data Structures](#2-data-structures)
* [3. Functions](#3-functions)
    * [3.1. `decode_png`](#31-decode_png)
    * [3.2. `read_chunk`](#32-read_chunk)
    * [3.3. `process_ihdr`](#33-process_ihdr)
    * [3.4. `process_idat`](#34-process_idat)
    * [3.5. `decompress_data`](#35-decompress-data)

<br>

## 1. Introduction

This document details the implementation of a PNG image decoder.  The decoder processes raw PNG data (in bytes) and extracts image information, including image dimensions and pixel data.  The code focuses on parsing the critical chunks of the PNG file format, primarily the IHDR (Image Header) and IDAT (Image Data) chunks.  Error handling for non-critical chunks is minimal.  This is an internal document meant to aid developers in understanding the codebase.

<br>

## 2. Data Structures

No explicit data structures beyond standard Python types are used in this simplified PNG decoder. Data is parsed and processed in a procedural fashion.

<br>

## 3. Functions

### 3.1. `decode_png`

This function serves as the main entry point for decoding a PNG image.

| Parameter | Type | Description |
|---|---|---|
| `png_data` | `bytes` | The raw PNG data as a byte string. |
| Returns | `tuple` or `None` | A tuple containing image width, height, color type, and pixel data (or `None` if decoding fails). |


```python
def decode_png(png_data):
    # Check if the data starts with the PNG signature
    if not png_data.startswith(b'\x89PNG\r\n\x1a\n'):
        return None  # Invalid PNG signature

    # ...rest of the function...
```

The function iterates through the PNG data, reading chunks until it encounters the IEND (Image End) chunk.  It uses the `read_chunk` function to parse individual chunks.

### 3.2. `read_chunk`

This function reads and parses a single chunk from the PNG data.

| Parameter | Type | Description |
|---|---|---|
| `data` | `bytes` | The remaining PNG data. |
| Returns | `tuple` or `None` | A tuple containing the chunk type (as bytes) and chunk data (as bytes), or `None` if a chunk cannot be parsed properly. |


```python
def read_chunk(data):
    if len(data) < 12:
        return None # Chunk too short
    length = int.from_bytes(data[:4], 'big')
    chunk_type = data[4:8]
    chunk_data = data[8:8+length]
    crc = data[8+length:12+length]
    return chunk_type, chunk_data
```

The function extracts the length, type, data, and CRC from the chunk header and data.  CRC checking is omitted for brevity in this example.


### 3.3. `process_ihdr`

This function processes the IHDR (Image Header) chunk, extracting image dimensions and color type.

| Parameter | Type | Description |
|---|---|---|
| `chunk_data` | `bytes` | The data from the IHDR chunk. |
| Returns | `tuple` or `None` | A tuple containing width, height, and color type, or `None` if processing fails. |


```python
def process_ihdr(chunk_data):
    if len(chunk_data) != 13:
        return None # Invalid IHDR chunk length

    width, height, bit_depth, color_type, compression_method, filter_method, interlace_method = struct.unpack(">IIBBBBB", chunk_data)
    #... processing and validation ...
```

It uses the `struct` module to unpack the data according to the IHDR specification.


### 3.4. `process_idat`

This function processes the IDAT (Image Data) chunk, decompressing the data.

| Parameter | Type | Description |
|---|---|---|
| `chunk_data` | `bytes` | The data from the IDAT chunk (compressed with zlib). |
| Returns | `bytes` or `None` | The decompressed image data, or `None` if decompression fails. |


```python
def process_idat(chunk_data):
    try:
        decompressed_data = zlib.decompress(chunk_data)
        return decompressed_data
    except zlib.error:
        return None
```

It uses the `zlib` module to decompress the data.  Error handling is included to catch potential decompression errors.


### 3.5. `decompress_data`

This function handles the decompression of the image data using the zlib library.  Error handling is included to manage potential issues during decompression.  The algorithm leverages the zlib library's built-in decompression capabilities; no custom decompression algorithm is implemented.

```python
import zlib

def decompress_data(compressed_data):
    try:
        decompressed_data = zlib.decompress(compressed_data)
        return decompressed_data
    except zlib.error as e:
        print(f"Decompression error: {e}")
        return None
```


This simplified decoder only handles IHDR and IDAT chunks.  A complete decoder would require handling other chunks (e.g., PLTE, tRNS) and implementing filtering and interlacing logic.  Error handling is basic and could be expanded to provide more detailed error messages.
