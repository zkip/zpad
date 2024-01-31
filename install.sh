#!/bin/sh

wget -O - https://github.com/llvm/llvm-project/releases/download/llvmorg-17.0.1/lld-17.0.1.src.tar.xz | tar -xJf -C .

cmake -S llvm -B build -G "Ninja" -DLLVM_ENABLE_PROJECTS="llvm;lld;clang" -DLLVM_TARGETS_TO_BUILD="WebAssembly" -DCMAKE_BUILD_TYPE=Release -DCMAKE_INSTALL——PREFIX=/usr/local/llvm
