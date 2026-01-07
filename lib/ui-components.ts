/**
 * Optimized Radix UI component wrappers
 * Import only commonly used components to reduce bundle size
 * For specific or rarely used Radix components, import directly from @radix-ui/react-*
 */

// Only export the most commonly used primitives
// This helps with tree-shaking and reduces unused code

// Dialog - commonly used for modals
export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

// Tabs - used in several pages
export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

// Dropdown Menu - common in headers
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from "@/components/ui/dropdown-menu";

// Select - commonly used in forms
export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from "@/components/ui/select";

// Tooltip - frequently used for hints
export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

// For less common components, import directly:
// import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
// import { AlertDialog, ... } from "@/components/ui/alert-dialog";
// import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
// etc.
