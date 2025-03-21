Use this file to supply facts for Cursor to generate code.

# vLLM Installation Options

## Requirements
- Python 3.8 or later

## Installation Options

### Build Types
- **Stable (0.8.1)**
  - Default installation method
  - Supports all CUDA versions
- **Nightly**
  - Preview builds
  - Only supports CUDA 12.4
  - Not available for Docker

### Package Types
1. **Python (pip)**
   ```bash
   # Default installation
   pip install vllm

   # Nightly build
   pip install vllm --pre --extra-index-url https://wheels.vllm.ai/nightly
   ```

2. **Python (uv)**
   ```bash
   # Default installation
   uv pip install vllm

   # Nightly build
   uv pip install vllm --extra-index-url https://wheels.vllm.ai/nightly
   ```

3. **Docker**
   ```bash
   docker run --runtime nvidia --gpus all \
       -v ~/.cache/huggingface:/root/.cache/huggingface \
       --env "HUGGING_FACE_HUB_TOKEN=<secret>" \
       -p 8000:8000 \
       --ipc=host \
       vllm/vllm-openai:latest \
       --model mistralai/Mistral-7B-v0.1
   ```
   - Only supports NVIDIA hardware
   - Only supports CUDA 12.4
   - Only available for stable builds

### Hardware Support
1. **NVIDIA GPUs**
   - Fully supported with the following CUDA versions:
     - CUDA 12.4 (default, supports all installation methods)
     - CUDA 12.1 (pip/uv only, stable builds only)
     - CUDA 11.8 (pip/uv only, stable builds only)

   For specific CUDA versions (stable builds only):
   ```bash
   # For CUDA 11.8
   export VLLM_VERSION=0.8.1
   pip install https://github.com/vllm-project/vllm/releases/download/v${VLLM_VERSION}/vllm-${VLLM_VERSION}+cu118-cp38-abi3-manylinux1_x86_64.whl --extra-index-url https://download.pytorch.org/whl/cu118

   # For CUDA 12.1
   export VLLM_VERSION=0.8.1
   pip install https://github.com/vllm-project/vllm/releases/download/v${VLLM_VERSION}/vllm-${VLLM_VERSION}+cu121-cp38-abi3-manylinux1_x86_64.whl --extra-index-url https://download.pytorch.org/whl/cu121
   ```

2. **Other Hardware**
   - AMD
   - Intel
   - TPU
   - Neuron

   All non-NVIDIA hardware requires building from source.

## Installation Constraints
1. **Docker constraints:**
   - NVIDIA hardware only
   - CUDA 12.4 only
   - Stable build only

2. **Nightly build constraints:**
   - CUDA 12.4 only
   - Not available for Docker

3. **Specific CUDA version constraints:**
   - CUDA 11.8 and 12.1 only available for:
     - Stable builds
     - Python installations (pip/uv)
     - NVIDIA hardware


# vLLM's Features
1. Leading Inference Performance: The Go-to Choice for LLM Inference
2. Wide Model Support: LLMs, Vision, Encoder-Decoder, and More
3. Multiple Hardware Backend: NVIDIA, AMD, Intel, TPU, Neuron
4. Versatile Features: LoRA, Quantization, and More
5. Easy to Scale: From Single GPU to Multi-GPU Systems
6. Production Ready: Stable and Reliable for Production Environments

# vLLM's Call to Actions
1. Get Started: Quickstart Guide and Installation Instructions docs.vllm.ai
2. Performance Dashboard: perf.vllm.ai
3. Roadmap roadmap.vllm.ai


# Links
* GitHub: https://github.com/vllm-project/vllm
* Docs: https://vllm.readthedocs.io/en/latest/
* Discuss: https://discuss.vllm.ai/
* Twitter: https://twitter.com/vllm_project
* LinkedIn: https://www.linkedin.com/company/vllm-project/
* Slack: https://slack.vllm.ai/

