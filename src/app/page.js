'use client'

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Check,
  ChevronRight,
  Code,
  Copy,
  CreditCard,
  Globe,
  Laptop,
  LayoutGrid,
  Linkedin,
  MessageSquare,
  Slack,
  Twitter,
  Zap,
  Book,
  BarChart,
  Map,
} from "lucide-react"

export default function Home() {
  const [selectedOptions, setSelectedOptions] = useState({
    build: "Stable",
    os: "Linux",
    package: "Python",
    hardware: "NVIDIA",
    compute: "CUDA 12.4"
  })
  const [hasCopied, setHasCopied] = useState(false)

  const handleOptionSelect = (category, value) => {
    if (category === "package" && value === "Docker") {
      // When switching to Docker, force NVIDIA hardware, default CUDA version, and Stable build
      setSelectedOptions(prev => ({
        ...prev,
        [category]: value,
        hardware: "NVIDIA",
        compute: "CUDA 12.4",
        build: "Stable"
      }))
    } else if (category === "hardware" && selectedOptions.package === "Docker") {
      // Prevent changing hardware when Docker is selected
      return
    } else if (category === "build" && selectedOptions.package === "Docker" && value === "Nightly") {
      // Prevent changing to nightly when Docker is selected
      return
    } else if (category === "build" && value === "Nightly") {
      // Force CUDA 12.4 when switching to Nightly
      setSelectedOptions(prev => ({
        ...prev,
        [category]: value,
        compute: "CUDA 12.4"
      }))
    } else if (category === "compute" && selectedOptions.build === "Nightly" && value !== "CUDA 12.4") {
      // Prevent changing to other CUDA versions in Nightly
      return
    } else {
      setSelectedOptions(prev => ({
        ...prev,
        [category]: value
      }))
    }
  }

  const getInstallCommand = () => {
    // If not NVIDIA, show build from source message
    if (selectedOptions.hardware !== "NVIDIA") {
      return "# Build from source is supported"
    }

    const installer = selectedOptions.package === "Python (uv)" ? "uv pip" : "pip"

    // Handle different CUDA versions for stable build
    if (selectedOptions.build === "Stable") {
      if (selectedOptions.compute === "CUDA 11.8") {
        return `export VLLM_VERSION=0.8.1
${installer} install https://github.com/vllm-project/vllm/releases/download/v\${VLLM_VERSION}/vllm-\${VLLM_VERSION}+cu118-cp38-abi3-manylinux1_x86_64.whl --extra-index-url https://download.pytorch.org/whl/cu118`
      } else if (selectedOptions.compute === "CUDA 12.1") {
        return `export VLLM_VERSION=0.8.1
${installer} install https://github.com/vllm-project/vllm/releases/download/v\${VLLM_VERSION}/vllm-\${VLLM_VERSION}+cu121-cp38-abi3-manylinux1_x86_64.whl --extra-index-url https://download.pytorch.org/whl/cu121`
      }

      // Default installation commands
      if (selectedOptions.package === "Docker") {
        return `docker run --runtime nvidia --gpus all -v ~/.cache/huggingface:/root/.cache/huggingface --env "HUGGING_FACE_HUB_TOKEN=<secret>" -p 8000:8000 --ipc=host vllm/vllm-openai:latest --model mistralai/Mistral-7B-v0.1`
      } else {
        return `${installer} install vllm`
      }
    } else if (selectedOptions.build === "Nightly") {
      if (selectedOptions.package === "Python (uv)") {
        return `${installer} install vllm --extra-index-url https://wheels.vllm.ai/nightly`
      }
      return `${installer} install vllm --pre --extra-index-url https://wheels.vllm.ai/nightly`
    }

    return `${installer} install vllm`
  }

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      setHasCopied(true)
      setTimeout(() => setHasCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <div className="flex min-h-screen flex-col lg:mx-50 mx-10">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-20 items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/full-logo.svg"
              alt="vLLM Logo"
              width={180}
              height={48}
              priority
              className="h-12 w-auto"
            />
          </div>
          <nav className="hidden md:flex gap-8">
            <Link href="https://docs.vllm.ai" className="text-base font-semibold hover:text-primary transition-colors">
              Documentation
            </Link>
            <Link href="https://github.com/vllm-project/vllm" className="text-base font-semibold hover:text-primary transition-colors">
              GitHub
            </Link>
            <Link href="https://discuss.vllm.ai" className="text-base font-semibold hover:text-primary transition-colors">
              Discuss
            </Link>
            <Link href="https://blog.vllm.ai" className="text-base font-semibold hover:text-primary transition-colors">
              Blog
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-8 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 xl:grid-cols-2 items-center">
              <div className="flex flex-col justify-center space-y-8">
                <div className="space-y-6">
                  <Link href="https://blog.vllm.ai/2025/01/27/v1-alpha-release.html">
                    <Badge className="inline-flex px-4 py-1.5 text-sm bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors">
                      Introducing vLLM V1 Core Engine
                    </Badge>
                  </Link>
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    <Image
                      src="/full-logo.svg"
                      alt="vLLM"
                      width={384}
                      height={192}
                      className="w-auto max-h-[120px] h-auto object-contain"
                      priority
                    />
                  </h1>
                  <p className="text-xl text-muted-foreground max-w-[600px] leading-relaxed">
                    Building the fastest and easiest-to-use serving and inference engine for LLMs.
                  </p>
                </div>
              </div>
              <div className="flex flex-col space-y-8 bg-muted/50 p-8 rounded-xl shadow-sm">
                <div className="grid gap-8">
                  <div className="flex items-center justify-between">
                    <div className="text-base font-medium">Build</div>
                    <div className="flex gap-2">
                      {["Stable", "Nightly"].map((option) => (
                        <Badge
                          key={option}
                          variant={selectedOptions.build === option ? "secondary" : "outline"}
                          className={`cursor-pointer px-4 py-2 ${
                            selectedOptions.build === option ? "bg-primary text-white" : ""
                          } ${selectedOptions.package === "Docker" && option === "Nightly" ? "opacity-50 cursor-not-allowed" : ""}`}
                          onClick={() => handleOptionSelect("build", option)}
                        >
                          {option === "Stable" ? "Stable (0.8.1)" : "Preview (Nightly)"}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-base font-medium">Hardware</div>
                    <div className="flex gap-2 flex-wrap justify-end">
                      {["NVIDIA", "AMD", "Intel", "TPU", "Neuron"].map((option) => (
                        <Badge
                          key={option}
                          variant={selectedOptions.hardware === option ? "secondary" : "outline"}
                          className={`cursor-pointer px-4 py-2 ${
                            selectedOptions.hardware === option ? "bg-primary text-white" : ""
                          } ${selectedOptions.package === "Docker" && option !== "NVIDIA" ? "opacity-50 cursor-not-allowed" : ""}`}
                          onClick={() => handleOptionSelect("hardware", option)}
                        >
                          {option}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-base font-medium">Package</div>
                    <div className="flex gap-2">
                      {["Python", "Python (uv)", "Docker"].map((option) => (
                        <Badge
                          key={option}
                          variant={selectedOptions.package === option ? "secondary" : "outline"}
                          className={`cursor-pointer px-4 py-2 ${selectedOptions.package === option ? "bg-primary text-white" : ""}`}
                          onClick={() => handleOptionSelect("package", option)}
                        >
                          {option}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {selectedOptions.hardware === "NVIDIA" && (
                    <div className="flex items-center justify-between">
                      <div className="text-base font-medium">CUDA Version</div>
                      <div className="flex gap-2">
                        {["CUDA 12.4", "CUDA 12.1", "CUDA 11.8"].map((option) => (
                          <Badge
                            key={option}
                            variant={selectedOptions.compute === option ? "secondary" : "outline"}
                            className={`cursor-pointer px-4 py-2 ${
                              selectedOptions.compute === option ? "bg-primary text-white" : ""
                            } ${(selectedOptions.package === "Docker" || selectedOptions.build === "Nightly") && option !== "CUDA 12.4" ? "opacity-50 cursor-not-allowed" : ""}`}
                            onClick={() => (selectedOptions.package === "Docker" || selectedOptions.build === "Nightly") && option !== "CUDA 12.4" ? null : handleOptionSelect("compute", option)}
                          >
                            {option}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-base font-medium">Run this Command:</div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-muted"
                      onClick={() => copyToClipboard(getInstallCommand())}
                    >
                      {hasCopied ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                      <span className="sr-only">Copy command</span>
                    </Button>
                  </div>
                  <div className="bg-background p-6 rounded-lg font-mono text-sm overflow-x-auto whitespace-normal break-words border">
                    {getInstallCommand()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    NOTE: vLLM recommends Python 3.11 or later for best performance.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Logos Section */}
        {/* <section className="w-full py-12 md:py-16 lg:py-20 border-y bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-xl font-medium tracking-tight md:text-2xl">Trusted by companies worldwide</h2>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16 opacity-70">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-center">
                    <Image
                      src={`/placeholder.svg?height=40&width=120`}
                      width={120}
                      height={40}
                      alt={`Company Logo ${i + 1}`}
                      className="h-8 w-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section> */}

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-16 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-6 text-center max-w-3xl mx-auto">
              <Badge className="px-4 py-1.5 text-sm">Features</Badge>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                vLLM is a high-throughput and memory-efficient inference and serving engine for LLMs
              </h2>
              <p className="text-lg text-muted-foreground md:text-xl max-w-[800px]">
                It is designed to incorporate latest models, hardware, and optimizations.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 mt-12">
              {[
                {
                  title: "Leading Inference Performance",
                  description: "The Go-to Choice for LLM Inference",
                  icon: <Zap className="h-10 w-10 text-primary" />,
                },
                {
                  title: "Wide Model Support",
                  description: "LLMs, Vision, Encoder-Decoder, and More",
                  icon: <LayoutGrid className="h-10 w-10 text-primary" />,
                },
                {
                  title: "Multiple Hardware Backend",
                  description: "NVIDIA, AMD, Intel, TPU, Neuron",
                  icon: <Laptop className="h-10 w-10 text-primary" />,
                },
                {
                  title: "Versatile Features",
                  description: "LoRA, Quantization, and More",
                  icon: <Code className="h-10 w-10 text-primary" />,
                },
                {
                  title: "Easy to Scale",
                  description: "From Single GPU to Multi-GPU Systems",
                  icon: <Globe className="h-10 w-10 text-primary" />,
                },
                {
                  title: "Production Ready",
                  description: "Stable and Reliable for Production Environments",
                  icon: <Check className="h-10 w-10 text-primary" />,
                },
              ].map((feature, i) => (
                <Card key={i} className="relative overflow-hidden group hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="p-3 rounded-full bg-primary/10 mb-4 w-fit group-hover:bg-primary/20 transition-colors">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-base">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="call-to-action" className="w-full py-12 md:py-16 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-6 text-center max-w-3xl mx-auto mb-16">
              <Badge className="px-4 py-1.5 text-sm">Get Started</Badge>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Ready to accelerate your LLM inference?
              </h2>
              <p className="text-lg text-muted-foreground md:text-xl">
                Checkout the following resources to get started with vLLM.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <Card className="relative overflow-hidden group hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="p-3 rounded-full bg-primary/10 mb-4 w-fit group-hover:bg-primary/20 transition-colors">
                    <Book className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Documentation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-base">
                    Comprehensive guides and API references to help you get started
                  </p>
                  <Link
                    href="https://docs.vllm.ai"
                    className="inline-flex items-center text-primary hover:underline group-hover:gap-3 transition-all gap-2"
                  >
                    Visit docs.vllm.ai
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden group hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="p-3 rounded-full bg-primary/10 mb-4 w-fit group-hover:bg-primary/20 transition-colors">
                    <BarChart className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Performance Dashboard</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-base">
                    Explore vLLM's performance benchmarks and comparisons
                  </p>
                  <Link
                    href="https://perf.vllm.ai"
                    className="inline-flex items-center text-primary hover:underline group-hover:gap-3 transition-all gap-2"
                  >
                    Visit perf.vllm.ai
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden group hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="p-3 rounded-full bg-primary/10 mb-4 w-fit group-hover:bg-primary/20 transition-colors">
                    <Map className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Roadmap</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-base">
                    See what's coming next and our development plans
                  </p>
                  <Link
                    href="https://roadmap.vllm.ai"
                    className="inline-flex items-center text-primary hover:underline group-hover:gap-3 transition-all gap-2"
                  >
                    Visit roadmap.vllm.ai
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="w-full py-12 md:py-16 border-t bg-muted/20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} vLLM. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="https://x.com/vllm_project" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="https://www.linkedin.com/company/vllm-project/" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="https://slack.vllm.ai/" className="text-muted-foreground hover:text-primary transition-colors">
                <Slack className="h-5 w-5" />
                <span className="sr-only">Slack</span>
              </Link>
              <Link href="https://discuss.vllm.ai/" className="text-muted-foreground hover:text-primary transition-colors">
                <MessageSquare className="h-5 w-5" />
                <span className="sr-only">Discuss</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
