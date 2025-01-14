import { useState } from 'react'
import { Card, CardContent } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Calendar } from "./ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
import { CalendarIcon } from 'lucide-react'
import { format } from "date-fns"

interface SidebarFiltersProps {
  categories?: string[];
  tags?: string[];
  onCategoryChange?: (category: string) => void;
  onTagChange?: (tag: string) => void;
  onDateChange?: (date: Date | undefined) => void;
  onSearch?: (term: string) => void;
}

export function SidebarFilters({
  categories,
  tags,
  onCategoryChange,
  onTagChange,
  onDateChange,
  onSearch
}: SidebarFiltersProps) {
  const [date, setDate] = useState<Date>()

  const handleCategoryChange = (value: string) => {
    if (onCategoryChange && typeof onCategoryChange === 'function') {
      onCategoryChange(value);
    }
  };

  const handleTagChange = (value: string) => {
    if (onTagChange && typeof onTagChange === 'function') {
      onTagChange(value);
    }
  };

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
    if (onDateChange && typeof onDateChange === 'function') {
      onDateChange(newDate);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch && typeof onSearch === 'function') {
      onSearch(e.target.value);
    }
  };

  return (
    <Card>
      <CardContent className="pt-4 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="search">Buscar</Label>
          <Input id="search" placeholder="¿Tienes algo en mente?..." onChange={handleSearch} />
        </div>
        {categories && (
          <div className="space-y-2">
            <Label htmlFor="category">Categoría</Label>
            <Select onValueChange={handleCategoryChange}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Seleccione una categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                {(categories || []).map((category) => (
                  <SelectItem key={category} value={category} className="">
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        {tags && (
          <div className="space-y-2">
            <Label htmlFor="tag">Etiqueta</Label>
            <Select onValueChange={handleTagChange}>
              <SelectTrigger id="tag">
                <SelectValue placeholder="Selecciones una etiqueta" />
              </SelectTrigger>
              <SelectContent>
                {(tags || []).map((tag) => (
                  <SelectItem key={tag} value={tag}>
                    {tag}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="date">Fecha</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={`w-full justify-start text-left font-normal ${!date && "text-muted-foreground"}`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Selecciona una fecha</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </CardContent>
    </Card>
  )
}

