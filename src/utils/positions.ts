const priorityColors = [
  {
    name: 'Low',
    color: 'bg-slate-200 text-black',
  },
  {
    name: 'Normal',
    color: 'bg-[#00ADEF] text-white',
  },
  {
    name: 'High',
    color: 'bg-[#FBBC41] text-black',
  },
  {
    name: 'Urgent',
    color: 'bg-[#F84D44] text-white',
  },
];

export default function getPriorityColor(priority: string) {
  return priorityColors.find((p) => p.name === priority)?.color;
}
