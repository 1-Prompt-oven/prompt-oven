import { cn } from "@/lib/utils";

interface CommonLayoutProps {
  className?: string;
  children: React.ReactNode;
}

const commonStyle = cn("w-full min-w-[320px] max-w-[600px]");
const headerStyle = cn("bg-[#111111] mx-auto flex h-20 w-full max-w-[1716px] items-center justify-between px-4")

//
function Container({ className, children }: CommonLayoutProps) {
  return (
    <div className={cn(commonStyle, "flex flex-col items-center", className)}>
      {children}
    </div>
  );
}

//
function Header({ className, children }: CommonLayoutProps) {
  return <header className={cn(headerStyle, className)}>{children}</header>;
}

// Tob Navigation Bar
function Tnb({ className, children }: CommonLayoutProps) {
  return <nav className={cn(commonStyle, className)}>{children}</nav>;
}

//
function Contents({ className, children }: CommonLayoutProps) {
  return <main className={cn(commonStyle, className)}>{children}</main>;
}

// Floating Action Button
function Fab({ className, children }: CommonLayoutProps) {
  return <aside className={cn(className)}>{children}</aside>;
}

//
function Footer({ className, children }: CommonLayoutProps) {
  return <footer className={cn(commonStyle, className)}>{children}</footer>;
}

// Bnb Navigation Bar
function Bnb({ className, children }: CommonLayoutProps) {
  return (
    <nav className={cn(commonStyle, "fixed bottom-0", className)}>
      {children}
    </nav>
  );
}

export const CommonLayout = {
  Container,
  Header,
  Tnb,
  Contents,
  Fab,
  Footer,
  Bnb,
};
