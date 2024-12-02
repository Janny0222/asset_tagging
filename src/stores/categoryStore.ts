import { create } from 'zustand'
import { CategoryProps } from '@/lib/definition'
import { getAllCategory, getSpecificCategoryData } from '@/services/Category/categoryService'

interface CategoryState {
    categoryData: CategoryProps[]
    selectedCategory: CategoryProps | null
    setCategoryData: (tableData: CategoryProps[]) => void
    setSelectedCategory: (table: CategoryProps) => void
    categoryRefresh: () => void
    fetchCategoryData: () => void
    fetchSpecificCategoryData: (id: number) => void
}

export const useCategoryStore = create<CategoryState>((set, get) => ({
    categoryData: [],
    selectedCategory: null,
    setCategoryData: (categoryData: CategoryProps[]) => set({ categoryData }),
    setSelectedCategory: (table: CategoryProps) => set({ selectedCategory: table }),
    categoryRefresh: () => get().fetchCategoryData(),
    fetchCategoryData: async () => {
        try {
            const category = await getAllCategory()
            set({ categoryData: category })
        } catch (error) {
            console.error('Error fetching Companies', error)
        }
    },
    fetchSpecificCategoryData: async (id: number) => {
        try {
            const category = await getSpecificCategoryData(id)
            set({ selectedCategory: category })
        } catch (error) {
            console.error('Error fetching Companies', error)
        }
    }
    
}))