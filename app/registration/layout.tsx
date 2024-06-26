import { Header } from "@/components/Header";

export default function layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      {children}
    </div>
  )
}